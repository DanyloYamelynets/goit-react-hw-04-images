import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/?',
});

export const requestImages = async (searchValue, page) => {
  const { data } = await instance({
    params: {
      q: searchValue,
      page,
      key: '37637573-d5c8b60c8c22622ef939ed7c2',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return data;
};
