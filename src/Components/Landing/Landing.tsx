import * as React from 'react';

interface Landing {
}

export const Landing: React.FC<Landing> = () => {
    return (
<section className='Landing'>
    <h1>Hi, this is the landing page</h1>
</section>
);
}