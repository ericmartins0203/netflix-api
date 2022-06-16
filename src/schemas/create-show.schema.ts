import Joi from 'joi'
import ShowCategory from '../enums/show-category.enum'
import JoiEnumString from '../utils/joi-custom-type.util'

const CreateShowSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  actors: Joi.string().required(),
  description: Joi.string().required(),
  category: JoiEnumString(ShowCategory),
  cover: Joi.string().required()
})

export default CreateShowSchema
