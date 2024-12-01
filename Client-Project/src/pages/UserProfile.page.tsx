import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AnimationWrapper from '../common/animation-page';
import Loader from '../components/loader.component';

function UserProfilePage() {

          const { id } = useParams();
          const [author, setauthor] = useState(null);
          const [loading, setloading] = useState(true);

          const fetchAuthorProfile= () => {
            axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + `/author`, { id })
            .then(async ({ data }) => {
                setauthor(data);
                setloading(false);
              }).catch((err) => {
                console.log(err);
                setloading(false);
              });
          }
          useEffect(() => {

            fetchAuthorProfile()
          },[])
          const { name, profile } = author || {};
  return (
<AnimationWrapper>
    {
      loading ? (
        <Loader/>
      ):<section className='h-cover md:flex min-[1100px]:gap-5 flex-row-reverse items-start '>
          <div className='flex flex-col max-md:items-center gap-5 min-w-[250px]'>
            <img src={profile} alt={name}  className='w-48 h-48 bg-grey rounded-full md:w-32 md:h-32' />
              <h1 className='text-2xl font-medium'>{name}</h1>
          </div>
      </section>
    }
</AnimationWrapper>
  )
}

export default UserProfilePage