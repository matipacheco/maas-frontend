import React, { useContext } from 'react';
import { MaasContext } from './context/Context';

export default function Schedule() {
  const maasContext = useContext(MaasContext);

  return (
    <div className="container-fluid">
      { maasContext.service && maasContext.service.name }
    </div>
  )
}
