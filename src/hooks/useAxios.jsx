import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  const axiosToken = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: { Authorization: `Token ${token}` },
  });
  const axiosAdminToken = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      Authorization: `Token d642bf9d1ce6afea84ec24aacdaf212b9bba957698102cc53a19a0b31f5f5c44`,
    },
  });
  // bütün kullanıcıların listesini çekebilmek için admin olarak giriş yapmak gerekiyor, normal kullanıcı olarak login olup "users" isteği atınca sadece kendi bilgileri geliyor. bunun için bir kere admin bilgileriyle login olup onun Token bilgisini aldık ve "users" isteğini onunla atıyoruz. normalde bu Token bir süre sonra çalışmayacak şekilde yapılması lazım ama logout yapmazsak sürekli kullanabiliyoruz. unutmuşlar sanırım, bizde ondan faydalanıyoruz :)
  const axiosBase = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
  });

  return { axiosToken, axiosBase, axiosAdminToken };
};

export default useAxios;
