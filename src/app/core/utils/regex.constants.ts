export const RGXP_STRONG_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-_.,;]).{8,20}$/;
export const RGXP_MID_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;
export const RGXP_WEAK_PASSWORD = /^(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;
export const RGXP_MID_PASSWORD_2 = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-_.,;]).{8,20}$/;
export const RGXP_NUMBER_PRICE = /^(?!0*[.,]0*$|[.,]0*$|0*$)\d+[,.]?\d{0,2}$/;

