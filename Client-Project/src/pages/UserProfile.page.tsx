import React from 'react'
import { useParams } from 'react-router-dom';

function UserProfilePage() {
          const { id } = useParams();
  return (
    <div>
          {id}
    </div>
  )
}

export default UserProfilePage