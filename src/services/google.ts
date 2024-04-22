import axios from 'axios'

import { env } from '@/env'

const axiosInstance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
  timeout: 5000,
})

export const getCoordinatesFromCEP = async ({ cep }: { cep: string }) => {
  try {
    const params = {
      address: `${cep},Brazil`,
      key: env.GOOGLE_API_GEOCODE,
    }

    const response = await axiosInstance.get('', { params })
    const data = response.data
    if (data.results[0]) {
      const location = data.results[0].geometry.location
      return {
        latitude: location.lat,
        longitude: location.lng,
      }
    } else {
      throw new Error('No results found')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
