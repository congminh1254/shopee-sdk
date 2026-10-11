import { EndpointSpec, NormalizedParam, ParsedEnum, toPascalCase } from "./types.js";

function enumKey(value: ParsedEnum): string {
  return JSON.stringify([value.type, value.members.map((m) => [m.name, m.value]).sort()]);
}

/** Share identical enums within a module; qualify incompatible definitions by field path. */
export function resolveEnumNames(specs: EndpointSpec[]): void {
  const definitions = new Map<string, Set<string>>();
  for (const spec of specs) {
    for (const value of spec.enums) {
      const keys = definitions.get(value.name) ?? new Set<string>();
      keys.add(enumKey(value));
      definitions.set(value.name, keys);
    }
  }
  const resolved = new Map<string, string>();
  for (const spec of specs) {
    const visit = (params: NormalizedParam[], context: string): void => {
      for (const param of params) {
        const fieldContext = context + toPascalCase(param.name);
        if (param.enum) {
          const value = param.enum;
          const originalName = value.name;
          const name = definitions.get(originalName)!.size > 1 ? fieldContext : originalName;
          const key = enumKey(value);
          if (resolved.has(name) && resolved.get(name) !== key) {
            throw new Error(`Conflicting enum definitions for ${name} in ${spec.apiName}`);
          }
          resolved.set(name, key);
          value.name = name;
          param.type = name;
        }
        if (param.children) visit(param.children, fieldContext);
      }
    };
    visit(spec.requestParams, `${toPascalCase(spec.endpointName)}Request`);
    visit(spec.responseParams, `${toPascalCase(spec.endpointName)}Response`);
  }
}
