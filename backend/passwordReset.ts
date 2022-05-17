
interface PasswordResetParams {
    email: string;
    type: string;
  }
  
  interface SetPasswordParams {
    password: string;
    reset_token: string;
  }
  
  export async function password_reset({
    email,
    type,
  }: PasswordResetParams): Promise<{ status: string }> {
    let reset_token: string = crypto.randomBytes(64).toString('hex');
    if (type === 'admin') {
      const user = await knex('users').where({ email: email }).returning('*');
  
      if (!user[0].reset_token) {
        await knex('users')
          .where({ email })
          .update({ reset_token })
          .returning('*');
      } else {
        reset_token = user[0].reset_token;
      }
    } else if (type === 'member') {
      const member = await knex('members').where({ email: email }).returning('*');
  
      if (!member[0].reset_token) {
        await knex('members')
          .where({ email })
          .update({ reset_token })
          .returning('*');
      } else {
        reset_token = member[0].reset_token;
      }
    }
    const appUrl = process.env.APP_URL || 'http://localhost:8000';
    const mail = {
      message: `Click here to reset your password ${appUrl}/${type}/set-password?token=${reset_token}`,
      subject: 'Reset Password',
    };
  
    await SendMail({
      toAddress: email,
      message: mail.message,
      subject: mail.subject,
    });
  
    return { status: 'success' };
  }
  
  export async function set_password({
    password,
    reset_token,
  }: SetPasswordParams): Promise<{ user: User; jwt: string }> {
    const getResult = await knex('users').where({ reset_token }).returning('*');
  
    const hash = await bcrypt.hash(password, 10);
  
    const updateResult: [User] = await knex('users')
      .where({ id: getResult[0].id })
      .update({ encrypted_password_hash: hash })
      .returning('*');
  
    const user = updateResult[0];
    const jwt = await jwtForUser(user);
    return { user, jwt };
  }
  