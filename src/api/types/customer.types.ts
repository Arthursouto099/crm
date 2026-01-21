export type CustomerModel = {
  createdAt: Date;
  updatedAt: Date;
  type: "PF" | "PJ";
  id_store: string;
  id_customer: string;
  name_customer: string;
  document_customer: string;
  email_customer: string | null;
  phone_customer: string | null;
  active: boolean;
  id_address: string | null;
  mainAddress: CustomerAddressModel;
  addresses: CustomerAddressModel[];
};

export type CustomerAddressModel = {
  number: string;
  id_customer: string;
  cep: string;
  street: string;
  complement: string | null;
  city: string;
  state: string;
  country: string;
  id_customerAddress: string;
  isDefault: boolean;
};

export type createCustomerBase = {
  name_customer: string;
  type: "PF" | "PJ";
  document_customer: string;
  email_customer: string;
  phone_customer: string;
  active?: boolean;
  address?: {
    cep: string;
    street: string;
    number: string;
    complement?: string | null;
    city: string;
    state: string;
    country: string;
  };
};

export type editAddressBase = {
  cep: string;
  street: string;
  number: string;
  complement?: string | null;
  city: string;
  state: string;
  country: string;
};

export type createAddressBase = {
  id_customer: string
  cep: string;
  street: string;
  number: string;
  complement?: string | null | undefined;
  city: string;
  state: string;
  country: string;
};
