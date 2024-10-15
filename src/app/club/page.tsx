import Container from '@/components/Assets/Container';
import ClubBanner from '@/components/Routes/Club/ClubBanner';
import ClubTermList from '@/components/Routes/Club/ClubTermList';

import React from 'react';

export default function MahdiyarPage() {
  return (
    <React.Fragment>
      <ClubBanner />
      <Container>
        <ClubTermList />
      </Container>
    </React.Fragment>
  );
}
