// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={user.photoURL}
      alt={user.member_name}
      color={user.photoURL ? 'default' : createAvatar(user.member_name).color}
      {...other}
    >
      {createAvatar(user.member_name).name}
    </MAvatar>
  );
}
