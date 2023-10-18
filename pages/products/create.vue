<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import type { FieldSettings } from '~/types/app'
import { ProductCreateSchema } from '~/types/product'

const productCreateStore = useProductCreateStore()
const { isLoading } = storeToRefs(productCreateStore)

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(ProductCreateSchema)
})
const fieldSettings: FieldSettings = {
  name: { initialValue: '' },
  price: { initialValue: '' }
}
const product = generateModel(fieldSettings)

const insertProduct = handleSubmit(async (product) => {
  await productCreateStore.createProduct(product)
  alert('Product created successfully')
})
</script>
<template>
  <div class="page-products-create">
    <h1 class="title">
      Create Product
    </h1>
    <v-form
      class="form-wrapper"
      validate-on="blur"
      @submit.prevent="insertProduct"
    >
      <v-text-field
        v-model.lazy="product.name.value.value"
        class="input -name"
        :error-messages="product.name.errorMessage.value"
        @blur="product.name.validate"
      >
        <template #prepend>
          <label class="label">Name</label>
        </template>
      </v-text-field>
      <v-text-field
        v-model.number="product.price.value.value"
        class="input -price"
        :error-messages="product.price.errorMessage.value"
        @blur="product.price.validate"
      >
        <template #prepend>
          <label class="label">Price</label>
        </template>
      </v-text-field>
      <div class="action">
        <v-btn type="submit" class="button" size="large" :loading="isLoading">
          Save
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<style lang="scss" scoped>
.page-products-create {
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
  }
  > .input.-name,
  > .input.-price {
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
