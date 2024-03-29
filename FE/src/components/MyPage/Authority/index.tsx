import { useQuery } from '@tanstack/react-query';

import GroupInfo from '../../Authority/GroupInfo';
import SearchForm from '../../Authority/SearchForm';

import { getGroupMembers } from '@/apis/group';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import { SUCCESS_GET_GROUP_MEMBERS } from '@/constants/code';
import { GroupMemberType } from '@/interfaces/group';
import theme from '@/styles/theme';

interface AuthorityProps {
  mapId: number;
}

const Authority = ({ mapId }: AuthorityProps) => {
  const { data: groupMembers, isLoading: groupMembersLoading } = useQuery(
    ['GroupMembers', mapId],
    () => {
      if (mapId) {
        return getGroupMembers(mapId);
      }
      return true;
    }
  );

  if (!groupMembersLoading && groupMembers.code !== SUCCESS_GET_GROUP_MEMBERS)
    return <div>API Error</div>;

  if (groupMembersLoading) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <section
      aria-hidden="true"
      className="flex flex-col items-center mt-8"
      onClick={e => e.preventDefault()}
    >
      <Text
        text="Group Permission Management"
        className="h-6"
        size="xRegularFill"
        color={theme.color.black}
      />
      {groupMembers && (
        <GroupInfo mapId={mapId} groupMembers={groupMembers.data} />
      )}
      {groupMembers && (
        <SearchForm
          mapId={mapId}
          groupMembers={groupMembers.data.map(
            (member: GroupMemberType) => member.member_nickname
          )}
        />
      )}
    </section>
  );
};

export default Authority;
