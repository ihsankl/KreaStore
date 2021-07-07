const initialState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const postPhone = (state = initialState, action) => {
  switch (action.type) {
    case 'PUT_PHONE_PENDING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
      };

    case 'PUT_PHONE_REJECTED':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
      };

    case 'PUT_PHONE_FULFILLED':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
      };

    default:
      return state;
  }
};

export const postVerifikasi = (state = initialState, action) => {
  switch (action.type) {
    case 'PUT_VERIFIKASI_PROFILE_PENDING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
      };

    case 'PUT_VERIFIKASI_PROFILE_REJECTED':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
      };

    case 'PUT_VERIFIKASI_PROFILE_FULFILLED':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
      };

    default:
      return state;
  }
};
