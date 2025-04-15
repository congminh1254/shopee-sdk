export type InputValidationType = 'INT_TYPE' | 'STRING_TYPE' | 'ENUM_TYPE' | 'FLOAT_TYPE' | 'DATE_TYPE' | 'TIMESTAMP_TYPE';
export type FormatType = 'NORMAL' | 'QUANTITATIVE';
export type DateFormatType = 'YEAR_MONTH_DATE' | 'YEAR_MONTH';
export type InputType = 'DROP_DOWN' | 'MULTIPLE_SELECT' | 'TEXT_FILED' | 'COMBO_BOX' | 'MULTIPLE_SELECT_COMBO_BOX';
export interface AttributeValue {
    value_id: number;
    original_value_name: string;
    display_value_name: string;
    value_unit?: string;
    parent_attribute_list: ParentAttribute[];
    parent_brand_list: ParentBrand[];
}
export interface ParentAttribute {
    parent_attribute_id: number;
    parent_value_id: number;
}
export interface ParentBrand {
    parent_brand_id: number;
}
export interface Attribute {
    attribute_id: number;
    original_attribute_name: string;
    display_attribute_name: string;
    is_mandatory: boolean;
    input_validation_type: InputValidationType;
    format_type: FormatType;
    date_format_type?: DateFormatType;
    input_type: InputType;
    attribute_unit: string[];
    attribute_value_list: AttributeValue[];
    max_input_value_number: number;
    introduction?: string;
}
