// @flow

export type Payment = {
  from: number,
  to: number,
  ammount: number
}
export type PaymentWithVerified = {
  ...$Exact<Payment>,
  verified: true
}

export opaque type VerifiedPayment: PaymentWithVerified = PaymentWithVerified

export const verify = (payment: Payment): VerifiedPayment => {
  return {
    ...payment,
    verified: true
  }
}

export const make = (payment: VerifiedPayment): boolean => {
  return true
}
