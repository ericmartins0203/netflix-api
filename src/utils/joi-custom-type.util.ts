import Joi from "joi"

const JoiEnumString = (enumerator: Object) => {
  return Joi.string().valid(...Object.values(enumerator))
}

export default JoiEnumString
