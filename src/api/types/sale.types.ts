

export type CreateSale = {
  paymentMethod: "CREDIT_CARD" | "DEBIT_CARD" | "CASH" | "PIX",
  discount: number,
  products: Item[]
}

type Item = {id_product: string, quantity: number}