import React from "react";
import CustomInput from "../ui/CustomInput";
import CustomSelect from "../ui/CustomSelect";

const ProductFields = ({
  product,
  brands,
  suppliers,
  ToggleProductType,
  state,
  control,
  register,
  errors,
}) => {
  const Fields = [
    {
      component: CustomInput,
      props: {
        title: "اسم المنتج",
        placeholder: "اسم المنتج",
        type: "text",
        fieldKey: "name",
        val: product?.name,
        required: true,
      },
    },
    {
      component: CustomInput,
      props: {
        title: "التخفيض",
        placeholder: "اختار التخفيض",
        type: "number",
        fieldKey: "discount",
        val: product?.discount,
      },
    },
    {
      component: CustomSelect,
      props: {
        title: "النوع",
        placeholder: "اختار النوع",
        name: "categoryId",
        fieldKey: "name",
        val: product?.categoryId,
        items: product?.categories?.map((category) => ({
          name: category?.name,
          value: category?._id,
        })),
        handler: ToggleProductType,
      },
    },
    {
      component: CustomSelect,
      props: {
        title: "البراند",
        placeholder: "اختار البراند",
        name: "specs.brand",
        fieldKey: "name",
        val: product?.specs?.brand,
        items: brands?.map((brand) => ({ name: brand, value: brand })),
      },
    },
    {
      component: CustomSelect,
      props: {
        title: "المورد",
        placeholder: "اختار المورد",
        name: "supplierId",
        fieldKey: "name",
        val: product?.supplierId,
        items: suppliers?.map((supplier) => ({
          name: `${supplier?.name} - ${supplier?.address?.store}`,
          value: supplier?._id,
        })),
      },
    },
    {
      component: CustomSelect,
      props: {
        title: "حالة المنتج",
        placeholder: "اختار الحالة",
        name: "status",
        fieldKey: "value",
        val: product?.status,
        items: [
          { name: "جديد", value: "جديد" },
          { name: "شبه جديد", value: "شبه جديد" },
        ],
      },
    },
    {
      component: CustomSelect,
      props: {
        title: "متاح للطلب ؟",
        placeholder: "اختار الحالة",
        name: "isAvailable",
        fieldKey: "value",
        val: product?.isAvailable,
        items: [
          { name: "متاح", value: "متاح" },
          { name: "غير متاح", value: "غير متاح" },
        ],
      },
    },
    {
      component: CustomInput,
      props: {
        title: "صورة المنتج",
        placeholder: "اختار صورة المنتج",
        type: "file",
        accept: "image/*",
        multiple: true,
        fieldKey: "ProductImages",
        required: state === "create",
      },
    },
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {Fields.map((field, index) => {
        const Component = field.component;
        return (
          <Component
            key={index}
            control={control}
            register={register}
            errors={errors}
            {...field.props}
          />
        );
      })}
    </div>
  );
};

export default ProductFields;
