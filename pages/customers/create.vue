<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { CustomerCreatePayloadSchema } from '~/store/customer'

const customerCreateStore = useCustomerCreateStore()
const { isLoading } = storeToRefs(customerCreateStore)

const { handleSubmit } = useForm({ validationSchema: toTypedSchema(CustomerCreatePayloadSchema) })
const fieldSettings: any = {
  name: { initialValue: '' },
  nameKana: { initialValue: '' },
  postalCode: { initialValue: '' },
  address: { initialValue: '' },
  subAddress: { initialValue: '' },
  tel: { initialValue: '' },
  fax: { initialValue: '' },
  contactName1: { initialValue: '' },
  contactTel1: { initialValue: '' },
  contactMail1: { initialValue: '' },
  contactName2: { initialValue: '' },
  contactTel2: { initialValue: '' },
  contactMail2: { initialValue: '' },
  contactName3: { initialValue: '' },
  contactTel3: { initialValue: '' },
  contactMail3: { initialValue: '' },
  memo1: { initialValue: '' },
  memo2: { initialValue: '' }
}
const customer = generateModel(fieldSettings)

const insertCustomer = handleSubmit(async (customer) => {
  await customerCreateStore.createCustomer(customer)
  navigateTo('/customers')
})
</script>
<template>
  <div class="page-customers-create">
    <h1 class="title">
      顧客登録
    </h1>
    <v-form
      class="form-wrapper"
      validate-on="blur"
      @submit.prevent="insertCustomer"
    >
      <v-text-field
        v-model.lazy="customer.name.value.value"
        class="input -name"
        :hide-details="false"
        :error-messages="customer.name.errorMessage.value"
        @blur="customer.name.validate"
      >
        <template #prepend>
          <label class="label">顧客名<az-required-label /></label>
        </template>
      </v-text-field>
      <v-text-field
        v-model="customer.nameKana.value.value"
        class="input -namekana"
        :hide-details="false"
        :error-messages="customer.nameKana.errorMessage.value"
        @blur="customer.nameKana.validate"
      >
        <template #prepend>
          <label class="label">顧客名カナ</label>
        </template>
      </v-text-field>
      <div class="action">
        <v-btn
          class="button"
          size="large"
          :loading="isLoading"
          @click="insertCustomer"
        >
          顧客情報を登録
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
  > .input,
  > .textarea,
  > .linewrapper {
    margin-bottom: 5px;
  }
  > .input.-name,
  > .input.-namekana {
    min-width: 550px;
    max-width: 50%;
  }

  > .textarea > :deep(.v-input__prepend),
  > .input > :deep(.v-input__prepend) {
    width: 110px;
    font-weight: 700;
  }
  > .textarea > :deep(.v-input__prepend) {
    padding: 0;
  }
  > .linewrapper {
    display: flex;
    gap: 15px;
  }
  > .linewrapper > .input.-postal {
    max-width: 320px;
  }
  > .linewrapper > .input > :deep(.v-input__prepend) {
    width: 110px;
    font-weight: 700;
  }
  > .action {
    text-align: center;
  }
}

.multiple-wrapper {
  display: flex;
  flex: 0 1 max(15%, 120px);
  > .label {
    width: 126px;
    font-weight: 700;
    line-height: 30px;
  }
  > .content {
    flex: 1;
  }
  > .content > .wrapper {
    display: flex;
    gap: 40px;
    margin-bottom: 5px;
  }
  > .content > .wrapper > .input {
    &.-name,
    &.-tel,
    &.-fax {
      width: 50%;
    }
    > :deep(.v-input__prepend) {
      width: 100px;
    }
    + .input > :deep(.v-input__prepend) {
      width: 60px;
    }
  }
}
</style>
