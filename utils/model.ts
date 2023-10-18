import { FieldSettings } from '~/types/app'

export function generateModel (modelSettings: FieldSettings) {
  return Object.keys(modelSettings).reduce((model: any, key: string) => {
    const setting = modelSettings[key]
    const path = setting.path || key
    return {
      ...model,
      [key]: useField(path, undefined, {
        initialValue: setting.initialValue ?? null,
        validateOnValueUpdate: setting.validateOnValueUpdate ?? false
      })
    }
  }, {})
}
