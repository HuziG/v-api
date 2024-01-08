import { Ref, ref } from 'vue'

function useApi<P, R>({
  fun
}): {
  loading: Ref<boolean>
  error: Ref<boolean>
  errorMessage: Ref<string>
  result: Ref<R>
  load: (params?: P) => Promise<R>
} {
  const loading = ref<boolean>(false)
  const error = ref<boolean>(false)
  const errorMessage = ref<string>('')
  const result = ref<any>()

  const load = async (params?: P): Promise<R> => {
    return new Promise(async (resolve, reject) => {
      loading.value = true

      try {
        const response = await fun(params || {})

        error.value = false

        result.value = response

        resolve(response)
      } catch (err: any) {
        error.value = true
        errorMessage.value = err.message || 'Unknown error'

        reject(err)
      } finally {
        loading.value = false
      }
    })
  }

  return {
    loading,
    error,
    errorMessage,
    result,
    load
  }
}

export default useApi
