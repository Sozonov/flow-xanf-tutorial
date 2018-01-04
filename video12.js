// @flow
import { make, verify, type Payment, type VerifiedPayment } from './payment'

const payment: Payment = {
  from: 1,
  to: 2,
  ammount: 20
}

const verified = verify(payment)
verified.from
verified.verified

const res = make(verified)
