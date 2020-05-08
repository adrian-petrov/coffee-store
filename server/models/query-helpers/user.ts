import models from '../index';

export async function getUserByEmail(email: string) {
  return await models.User.findOne({ where: { email: email } });
}

export async function isUserAdmin(id: string | number) {
  const user = await models.User.findOne({
    where: { user_id: id },
    include: {
      model: models.Role,
      through: {
        attributes: ['role_id'],
      },
    },
  });

  const userType = user.roles[0].dataValues.role_type;
  return userType === 'admin';
}
