export const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

export const buildUrl = (url, params) => {
  let urlWithParams = url;

  Object.entries(params).forEach(([key, value], i) => {
    const symbol = !i ? '?' : '&';
    urlWithParams += `${symbol}${key}=${value}`;
  });

  return urlWithParams;
};
