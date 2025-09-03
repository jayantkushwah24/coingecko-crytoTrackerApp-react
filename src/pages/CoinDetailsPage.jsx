import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchCoinDetails } from '../service/fetchCoinDetails';

const CoinDetailsPage = () => {
  const {coinId} = useParams();
  fetchCoinDetails(coinId);
  return (
    <div>
      {coinId}
    </div>
  )
}

export default CoinDetailsPage