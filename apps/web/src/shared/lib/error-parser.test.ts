import axios, { AxiosHeaders, type AxiosResponse } from 'axios'
import { describe, expect, it } from 'vitest'

import { parseApiError } from './error-parser'

describe('error-parser', () => {
  describe('parseApiError', () => {
    it('should parse an AxiosError containing API error structure', () => {
      const responseData = {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'The email field is invalid.',
          details: {
            email: ['Invalid email address'],
          },
        },
      }

      const axiosResponse: AxiosResponse = {
        data: responseData,
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: { headers: new AxiosHeaders() },
      }

      const error = new axios.AxiosError(
        'Request failed with status code 400',
        'ERR_BAD_REQUEST',
        undefined,
        undefined,
        axiosResponse
      )

      const result = parseApiError(error)
      expect(result).toEqual({
        code: 'VALIDATION_ERROR',
        message: 'The email field is invalid.',
        details: {
          email: ['Invalid email address'],
        },
      })
    })

    it('should parse network AxiosError (ERR_NETWORK)', () => {
      const error = new axios.AxiosError(
        'Network Error',
        'ERR_NETWORK',
        undefined,
        undefined,
        undefined
      )

      const result = parseApiError(error)
      expect(result).toEqual({
        code: 'NETWORK_ERROR',
        message:
          'Unable to connect to server. Please check your internet connection.',
        details: undefined,
      })
    })

    it('should fallback to AxiosError default message if no API data exists', () => {
      const error = new axios.AxiosError(
        'Some generic HTTP error',
        'ERR_GENERIC',
        undefined,
        undefined,
        undefined
      )

      const result = parseApiError(error)
      expect(result).toEqual({
        code: 'UNKNOWN_ERROR',
        message: 'Some generic HTTP error',
        details: undefined,
      })
    })

    it('should parse a raw unwrapped API error object', () => {
      const unwrappedError = {
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message: 'Note not found',
          details: undefined,
        },
      }

      const result = parseApiError(unwrappedError)
      expect(result).toEqual({
        code: 'RESOURCE_NOT_FOUND',
        message: 'Note not found',
        details: undefined,
      })
    })

    it('should parse a standard JavaScript Error instance', () => {
      const error = new Error('Test standard Javascript error message')
      const result = parseApiError(error)
      expect(result).toEqual({
        code: 'UNKNOWN_ERROR',
        message: 'Test standard Javascript error message',
        details: undefined,
      })
    })

    it('should parse fallback unknown values', () => {
      expect(parseApiError(null)).toEqual({
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred. Please try again later.',
        details: undefined,
      })

      expect(parseApiError('random string error')).toEqual({
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred. Please try again later.',
        details: undefined,
      })
    })
  })
})
