<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import type { FieldSettings } from '~/types/app'
import { CustomerCreateSchema } from '~/types/customer'

const customerCreateStore = useCustomerCreateStore()
const { isLoading } = storeToRefs(customerCreateStore)

const typeOptions = [
  { label: 'Normal', value: 1 },
  { label: 'Superman', value: 2 }
]
const statusOptions = [
  { label: 'Active', value: true },
  { label: 'Inactive', value: false }
]

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(CustomerCreateSchema)
})
const fieldSettings: FieldSettings = {
  name: { initialValue: '' },
  nameKana: { initialValue: '' },
  age: { initialValue: '' },
  email: { initialValue: '' },
  birthday: { initialValue: '' },
  type: { initialValue: 1 },
  status: { initialValue: true }
}
const customer = generateModel(fieldSettings)

const insertCustomer = handleSubmit(async (customer) => {
  await customerCreateStore.createCustomer(customer)
  alert('Customer created successfully')
})
</script>
<template>
  <div class="page-customers-create">
    <h1 class="title">
      Create Customer
    </h1>
    <v-form
      class="form-wrapper"
      validate-on="blur"
      @submit.prevent="insertCustomer"
    >
      <v-text-field
        v-model="customer.name.value.value"
        class="input -name"
        :error-messages="customer.name.errorMessage.value"
        @blur="customer.name.validate"
      >
        <template #prepend>
          <label class="label">Name</label>
        </template>
      </v-text-field>
      <v-text-field
        v-model="customer.nameKana.value.value"
        class="input -namekana"
        :error-messages="customer.nameKana.errorMessage.value"
        @blur="customer.nameKana.validate"
      >
        <template #prepend>
          <label class="label">Name Kana</label>
        </template>
      </v-text-field>
      <v-text-field
        v-model="customer.age.value.value"
        class="input -age"
        :error-messages="customer.age.errorMessage.value"
        @blur="customer.age.validate"
      >
        <template #prepend>
          <label class="label">Age</label>
        </template>
      </v-text-field>
      <v-text-field
        v-model="customer.email.value.value"
        class="input -email"
        :error-messages="customer.email.errorMessage.value"
        @blur="customer.email.validate"
      >
        <template #prepend>
          <label class="label">Email</label>
        </template>
      </v-text-field>
      <v-text-field
        v-model="customer.birthday.value.value"
        type="date"
        class="input -birthday"
        :error-messages="customer.birthday.errorMessage.value"
        @blur="customer.birthday.validate"
      >
        <template #prepend>
          <label class="label">Birthday</label>
        </template>
      </v-text-field>
      <v-select
        v-model="customer.type.value.value"
        class="input -type"
        variant="outlined"
        bg-color="white"
        item-title="label"
        item-value="value"
        :items="typeOptions"
      >
        <template #prepend>
          <strong class="label"> Type </strong>
        </template>
      </v-select>
      <v-radio-group
        v-model="customer.status.value.value"
        inline
        density="comfortable"
        class="input -radio-group"
      >
        <template #prepend>
          <strong class="label"> Status </strong>
        </template>
        <v-radio
          v-for="(option, index) in statusOptions"
          :key="`type-${index}`"
          class="radio"
          :label="option.label"
          :value="option.value"
        />
      </v-radio-group>
      <div class="action">
        <v-btn type="submit" class="button" size="large" :loading="isLoading">
          Save
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<style lang="scss" scoped>
.page-customers-create {
  margin: 24px auto;
  padding: 0 40px;
  max-width: 1180px;
  > .title {
    font-size: 20px;
    line-height: 20px;
  }
}
.form-wrapper {
  margin-top: 16px;
  padding: 24px 56px;
  border-radius: 4px;
  background-color: rgb(var(--v-theme-on-primary));
  > .input {
    margin-bottom: 5px;
    min-width: 550px;
    max-width: 50%;
  }
  > .input > :deep(.v-input__prepend) {
    width: 110px;
    font-weight: 700;
  }
  > .action {
    text-align: right;
  }
}
</style>
