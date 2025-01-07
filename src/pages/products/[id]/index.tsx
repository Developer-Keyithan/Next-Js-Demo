import React from 'react';
import { GetServerSideProps } from 'next';

type Props = {
  id: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  return { props: { id: params?.id as string } };
};

const DynamicProductDetails = ({ id }: Props) => {
  return (
    <div>
      <h1>Product Detail is "{id}"</h1>
    </div>
  );
};

export default DynamicProductDetails;
