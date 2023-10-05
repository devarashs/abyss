import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CreatorSidePanel } from '../components';

export default function CreatorDashboard() {
  return (
    <>
      <Helmet>
        <title>Creator Dashboard</title>
      </Helmet>
      <div>
        <CreatorSidePanel width="50%" />
      </div>
    </>
  );
}
