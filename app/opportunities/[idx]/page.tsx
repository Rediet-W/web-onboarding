'use client';

import { Provider } from 'react-redux';
import OpportunityDetails from '../../components/Details';
import { useParams } from 'next/navigation';
import {store} from '../../../store';  
interface idParamsType {
  params: {
    idx: string;
  };
}

export default function OpportunityPage({params}:idParamsType) {
  return (
    <Provider store={store}>
      <OpportunityDetails id={params.idx}/>
    </Provider>
  );
}
