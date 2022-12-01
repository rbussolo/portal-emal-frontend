function maskCnpj(cnpj: string): string{
  cnpj = cnpj.replace(/\D/g, "");
  cnpj = cnpj.replace(/(\d{1,14})\d*/g, "$1");
  cnpj = cnpj.replace(/(\d{2})(\d)/, "$1.$2");
  cnpj = cnpj.replace(/(\d{3})(\d)/, "$1.$2");
  cnpj = cnpj.replace(/(\d{3})(\d)/, "$1/$2");
  cnpj = cnpj.replace(/(\d)(\d{2})$/, "$1-$2");
  
  return cnpj;
}

function maskCpf(cpf: string): string {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{1,11})\d*/g, "$1");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return cpf;
}

function maskCpfCnpj(cpfCnpj: string): string { //MASCARA PARA CPF E CNPJ	 
  cpfCnpj = cpfCnpj.replace(/\D/g, "");
  cpfCnpj = cpfCnpj.replace(/(\d{1,14})\d*/g, "$1");

  if (cpfCnpj.length < 12) {
    cpfCnpj = cpfCnpj.replace(/\D/g, "");
    cpfCnpj = cpfCnpj.replace(/(\d{3})(\d)/, "$1.$2");
    cpfCnpj = cpfCnpj.replace(/(\d{3})(\d)/, "$1.$2");
    cpfCnpj = cpfCnpj.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    cpfCnpj = cpfCnpj.replace(/\D/g, "");
    cpfCnpj = cpfCnpj.replace(/(\d{2})(\d)/, "$1.$2");
    cpfCnpj = cpfCnpj.replace(/(\d{3})(\d)/, "$1.$2");
    cpfCnpj = cpfCnpj.replace(/(\d{3})(\d)/, "$1/$2");
    cpfCnpj = cpfCnpj.replace(/(\d)(\d{2})$/, "$1-$2");
  }

  return cpfCnpj;
}

function maskCelular(celular: string): string { // (99) 99999-9999
  celular = celular.replace(/\D/g, "");
  celular = celular.replace(/(\d{1,11})\d*/g, "$1");

  celular = celular.replace(/\D/g, "");
  celular = celular.replace(/(\d{2})(\d)/, "($1) $2");
  celular = celular.replace(/(\d{5})(\d)/, "$1-$2");
  
  return celular;
}

function removeMask(text: string) {
  return text.replace(/\D/g, "");
}

export { maskCnpj, maskCpf, maskCpfCnpj, maskCelular, removeMask };