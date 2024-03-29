import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import SearchModalContent from '../SearchModalContent';

import { getMapCategories } from '@/apis/category';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import GlobalModal from '@/components/common/GlobalModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Text from '@/components/common/Text';
import { SUCCESS_GET_CATEGORIES } from '@/constants/code';
import { useGetMapId } from '@/hooks/useGetMapId';
import theme from '@/styles/theme';
import { PlaceType } from '@/types/map';

interface PlaceInfosProps {
  placeInfos: PlaceType[];
  setCurrentCoords: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}

const PlaceInfos = ({ placeInfos, setCurrentCoords }: PlaceInfosProps) => {
  const mapId = useGetMapId();
  const [isOpenGlobalModal, setIsOpenGlobalModal] = useState(false);
  const [placeInfo, setPlaceInfo] = useState<PlaceType>();

  const { data: mapCategory, isLoading: categoryLoading } = useQuery(
    ['MapCategories', mapId],
    () => getMapCategories(mapId)
  );

  const handleClickPlace = (id: number) => {
    const clickedPlace = placeInfos.find(
      (place: PlaceType) => place.place_id === id
    );

    setPlaceInfo(clickedPlace);
    setIsOpenGlobalModal(true);
  };

  const handleCardClick = (lat: number, lng: number) => {
    setCurrentCoords({ lat, lng });
  };

  if (!categoryLoading && mapCategory.code !== SUCCESS_GET_CATEGORIES)
    return <div>API Error</div>;

  if (categoryLoading) return <LoadingSpinner size="medium" />;

  return (
    placeInfos && (
      <section className="h-[calc(100vh-10rem)] flex flex-col gap-4 mt-8 absolute right-0 overflow-y-scroll z-[1000]">
        {placeInfos.map &&
          placeInfos.map((place: PlaceType) => (
            <Card
              size="large"
              key={`InfoCard-${place.place_id}`}
              color={theme.color.white}
              onClick={() => handleCardClick(place.latitude, place.longitude)}
            >
              <div className="flex flex-col gap-8">
                <Text
                  size="xRegular"
                  text={place.place_name}
                  color={theme.color.lightGreen}
                />
                <Text
                  size="small"
                  text={place.address}
                  color={theme.color.gray}
                />
                <Button
                  size="small"
                  color={theme.color.navy}
                  onClick={() => handleClickPlace(place.place_id)}
                >
                  <Text
                    size="small"
                    text="선택하기"
                    color={theme.color.white}
                  />
                </Button>
              </div>
            </Card>
          ))}
        {mapCategory && isOpenGlobalModal && (
          <GlobalModal
            size="large"
            handleCancelClick={() => setIsOpenGlobalModal(false)}
          >
            <SearchModalContent
              placeInfo={placeInfo as PlaceType}
              mapCategory={mapCategory.data}
            />
          </GlobalModal>
        )}
      </section>
    )
  );
};

export default PlaceInfos;
