import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.14:8080/cars'; // ajuste para seu IP e porta

//  api das imagens dos carro
export const getCarImage = async (carName) => {
  try {
    const response = await axios.get(`https://carimagery.com/api.asmx/GetImageUrl?searchTerm=${carName}`, {
      responseType: 'text'
    });

    const text = response.data;
    const match = text.match(/<string.*?>(.*?)<\/string>/);
    const imageUrl = match ? match[1] : null;

    return imageUrl;
  } catch (error) {
    console.error("Erro ao buscar imagem:", error);
    return null;
  }
};
// Get basico
export const getAllCars = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listar`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar carros:', error);
    throw error;
  }
};
// Post basico
export const saveCar = async (carData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/salvar`, carData);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar carro:', error);
    throw error;
  }
};
//  delete 
export const deleteCar = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/deletar/${id}`);
  } catch (error) {
    console.error('Erro ao deletar carro:', error);
    throw error;
  }
};

// PUT atualizar favorito
export const updateFavorite = async (id, isFavorite) => {
  try {
    console.log(`updateFavorite: id = ${id}, isFavorite = ${isFavorite}`);
    const response = await axios.put(`${API_BASE_URL}/${id}/favorite`, { isFavorite });
    console.log('updateFavorite response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error.response?.data || error.message);
    throw error;
  }
};

// PUT 
export const updateCar = async (id, carData) => {
  try {
    console.log(`updateCar: Iniciando atualização do carro com id=${id}`);
    console.log('updateCar: Dados enviados para backend:', carData);

    const response = await axios.put(`${API_BASE_URL}/atualizar/${id}`, carData);

    console.log('updateCar: Resposta recebida do backend:', response.data);
    return response.data;
  } catch (error) {
    console.error('updateCar: Erro ao atualizar carro:', error.response?.data || error.message);
    throw error;
  }
};
// atualizar se nao tiver cria um carrinho 
export const saveOrUpdateCar = async (carData) => {
  try {
    if (carData.id) {
      console.log('saveOrUpdateCar: Atualizando carro com ID', carData.id);
      return await updateCar(carData.id, carData);
    } else {
      console.log('saveOrUpdateCar: Criando novo carro');
      const response = await saveCar(carData);
      console.log('saveOrUpdateCar: Novo carro criado:', response);
      return response;
    }
  } catch (error) {
    console.error('saveOrUpdateCar: Erro ao salvar ou atualizar carro:', error.response?.data || error.message);
    throw error;
  }
};
