import React from "react";

const Product3DView = ({ product }) => {
  console.log(product?.productView);
  return (
    <div className="rounded-lg mt-20">
      <div className="sketchfab-embed-wrapper">
        <iframe
          title={product?.name}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          className="w-full min-h-[440px]"
          src={`https://sketchfab.com/models/${product?.productView}/embed?autospin=1&camera=0&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_theme=dark&dnt=1`}
        />
      </div>
    </div>
  );
};

export default Product3DView;
