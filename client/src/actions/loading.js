export const openLoading = () => {
  return function (dispatch) {
    dispatch({
      type: 'LOADING_ON'
    })
    dispatch({
      type: 'CLEAR_SKY'
    })
  }
}