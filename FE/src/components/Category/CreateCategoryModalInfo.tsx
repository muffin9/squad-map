import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import LoadingSpinner from '../common/LoadingSpinner';

import { getMapCategories, postCategory } from '@/apis/category';
import { Icons } from '@/assets/icons';
import Button from '@/components/common/Button';
import GlobalModal from '@/components/common/GlobalModal';
import Icon from '@/components/common/Icon';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';
import ModalContent from '@/components/ModalContent';
import {
  SUCCESS_GET_CATEGORIES,
  SUCCESS_POST_CATEGORY,
} from '@/constants/code';
import { CategoryColors } from '@/constants/colors';
import { useGetMapId } from '@/hooks/useGetMapId';
import useModal from '@/hooks/useModal';
import { CategoryType } from '@/interfaces/Category';
import theme from '@/styles/theme';
import { isExistBgColor, checkDuplicateColor } from '@/utils/util';

interface CreateCategoryModalInfoProps {
  setIsCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCategoryModalInfo = ({
  setIsCategoryModal,
}: CreateCategoryModalInfoProps) => {
  const mapId = useGetMapId();

  const {
    data: mapCategories,
    isLoading: headerLoading,
    refetch: refetchMapCategories,
  } = useQuery(['MapCategories', mapId], () => getMapCategories(mapId));

  const [categoryFormData, setCategoryFormData] = useState({
    category_name: '',
    category_color: '',
  });

  const { isModal, setIsModal, modalText, setModalText } = useModal({
    title: '',
    description: '',
    buttonText: '',
    handleButtonClick: () => true,
  });

  const fetchPostCategory = useMutation(postCategory, {
    onSuccess: ({ code }: { code: string }) => {
      if (code === SUCCESS_POST_CATEGORY) {
        setModalText({
          title: '카테고리가 등록되었습니다.',
          description: '카테고리 등록 완료',
          buttonText: '확인',
          handleButtonClick: () => {
            setIsModal(false);
            setIsCategoryModal(false);
            refetchMapCategories();
            return true;
          },
        });
        setIsModal(true);
      }
    },
    onError: (error: unknown) => {
      throw new Error(`error is ${error}`);
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFormData({ ...categoryFormData, category_name: e.target.value });
  };

  const handleColorClick = (category_color: string) => {
    setCategoryFormData({ ...categoryFormData, category_color });
  };

  const isExistName = () => {
    const existName = mapCategories.data.map(
      (category: CategoryType) => category.category_name
    );
    if (existName.includes(categoryFormData.category_name)) return true;
    return false;
  };

  const handleCreateCategory = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryFormData.category_name || isExistName()) {
      setModalText({
        title: '이름을 확인해주세요.',
        description: '카테고리 등록 실패',
        buttonText: '다시시도',
        handleButtonClick: () => {
          setIsModal(false);
          return true;
        },
      });
      setIsModal(true);
      return;
    }
    if (
      !categoryFormData.category_color ||
      isExistBgColor(mapCategories.data, categoryFormData.category_color)
    ) {
      setModalText({
        title: '색상을 확인해주세요.',
        description: '카테고리 등록 실패',
        buttonText: '다시시도',
        handleButtonClick: () => {
          setIsModal(false);
          return true;
        },
      });
      setIsModal(true);
      return;
    }

    const newCategory = {
      category_name: categoryFormData.category_name,
      category_color: categoryFormData.category_color,
    };

    fetchPostCategory.mutate({
      mapId,
      categoryPostParams: newCategory,
    });
  };

  if (!headerLoading && mapCategories.code !== SUCCESS_GET_CATEGORIES)
    return <div>API Error</div>;

  if (headerLoading) {
    return <LoadingSpinner size="medium" />;
  }

  return (
    <>
      {mapCategories && (
        <section className="h-full flex flex-col items-center justify-center">
          <header className="flex flex-col items-center gap-4 mb-4">
            <h1 className="text-2xl text-navy">카테고리 추가하기</h1>
          </header>
          <div className="flex items-center gap-1 mb-8">
            <Icon
              size="small"
              url={Icons.Exclamation}
              alt="카테고리 추가 문구"
            />
            <Text
              text="카테고리를 추가 할 수 있습니다. (장소당 1개)"
              size="xSmall"
              color={theme.color.gray}
            />
          </div>
          <form className="flex flex-col items-center">
            <div className="w-60 flex flex-col gap-4 mb-8">
              <label htmlFor="name" className="text-lightGray">
                카테고리명
              </label>
              <Input
                id="name"
                width="15rem"
                height="2.5rem"
                placeholderText="카테고리 이름"
                background={theme.color.inputBackground}
                type="text"
                value={categoryFormData.category_name}
                onChange={handleNameChange}
              />
              {isExistName() && (
                <Text
                  text="중복되는 카테고리 이름입니다."
                  size="xSmall"
                  color={theme.color.red}
                />
              )}
            </div>
            <div className="w-60 flex flex-col gap-4 mb-8">
              <span className="text-lightGray">카테고리 색상</span>
              <div className="flex flex-wrap gap-2">
                {CategoryColors.map((color: string) => (
                  <button
                    data-testid={`test-id-${color}`}
                    key={`category-${color}`}
                    type="button"
                    aria-label="color-button"
                    style={{
                      backgroundColor: color,
                    }}
                    className={`w-8 h-8 rounded-full hover:opactiy-80 ${
                      isExistBgColor(mapCategories.data, color)
                        ? 'opacity-10'
                        : 'opacity-100'
                    }`}
                    onClick={() => handleColorClick(color)}
                    disabled={checkDuplicateColor(mapCategories.data, color)}
                  />
                ))}
              </div>
              <span className="text-lightGray">
                현재 선택된 카테고리 :{' '}
                {categoryFormData.category_color || '미선택'}
              </span>
            </div>

            <div className="mt-4">
              <Button
                type="submit"
                size="xRegular"
                color={theme.color.black}
                onClick={(e: React.SyntheticEvent<HTMLFormElement>) =>
                  handleCreateCategory(e)
                }
              >
                <Text
                  text="카테고리 생성"
                  size="regular"
                  color={theme.color.white}
                />
              </Button>
            </div>
          </form>
        </section>
      )}
      {isModal && (
        <GlobalModal size="xSmall" handleCancelClick={() => setIsModal(false)}>
          <ModalContent
            title={modalText.title}
            description={modalText.description}
            buttonText={modalText.buttonText}
            handleButtonClick={modalText.handleButtonClick}
          />
        </GlobalModal>
      )}
    </>
  );
};

export default CreateCategoryModalInfo;
