import joi from "joi";
export const listingSchema = joi.object({
  listings: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
      image: joi
        .object({
          //   filename: joi.string().allow("", null),
          //   url: joi.string().allow("", null),
        })
        .optional(),
      price: joi.number().required().min(0),
      location: joi.string().required(),
      country: joi.string().required(),
    })
    .required(),
});

export const reviewSchema = joi.object({
  review: joi
    .object({
      rating: joi.number().required().min(1).max(5),
      comment: joi.string().required(),
    })
    .required(),
});
