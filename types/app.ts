export interface FieldSettings {
  [key: string]: {
    initialValue?: unknown
    validateOnValueUpdate?: true
    path?: string
  }
}
