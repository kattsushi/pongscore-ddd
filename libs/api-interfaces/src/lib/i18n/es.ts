
export const es: typeof import('./en').en = {
  AUTH: {
    SUCCESS: {
      LOGIN: 'Inicio de Sesion Exitoso',
      USER_REGISTERED_SUCCESSFULLY: 'Usuario Registrado Correctamente',
      EMAIL_VERIFIED: 'Correo Verificado',
      EMAIL_RESENT: 'Correo Reenviado',
      PASSWORD_CHANGED: 'Password Changed'
    },
    ERROR: {
      LOGIN: 'Hubo un Error de Inicio de Sesion',
      USER_NOT_FOUND: 'Usuario no encontrado',
      EMAIL_NOT_VERIFIED: 'Correo no Verificado',
      WRONG_PASSWORD: 'Contraseña Invalida',
      MAIL_NOT_SENT: 'Mail not Sent',
      GENERIC_ERROR: 'Something went Wrong',
      USER_ALREADY_REGISTERED: 'Usuario ya esta registrado',
      MISSING_MANDATORY_PARAMETERS: 'Faltan Campos Requeridos',
      EMAIL_SENDED_RECENTLY: 'Correo enviado recientemente',
      USER_NOT_REGISTERED: 'Usuario no Registrado',
      EMAIL_CODE_NOT_VALID: 'Codigo de Correo no Valido',
      WRONG_CURRENT_PASSWORD: 'Wrong Current Password',
      CHANGE_PASSWORD_ERROR: 'Error Change Password',
    },
    LOGIN: {
      PASSWORD: 'Contraseña',
      FORGOT_PASSWORD: 'Olvidaste tu contraseña?',
      EMAIL: 'Correo',
      LOGIN: 'Iniciar Sesion',
      DONT_HAVE_A_ACCOUNT: 'No tienes una cuenta?',
      REGISTER: 'Registrate'
    },
    REGISTER: {
      FIRST_NAME: 'Nombres',
      LAST_NAME: 'Apellidos',
      EMAIL: 'Correo',
      PASSWORD: 'Contraseña',
      CONFIRM_PASSWORD: 'Confirma la Contraseña',
      ACCEPT_TERMS: 'Acepta los Terms.',
      REGISTER: 'Registrate'
    },
    RESET_PASSWORD: {
      CURRENT_PASSWORD: 'Contraseña Actual',
      NEW_PASSWORD: 'Nueva Contraseña',
      CHANGE_PASSWORD: 'Cambia la Contraseña',
    },
    FORGOT_PASSWORD: {
      FORGOT_PASSWORD: 'Olvide mi contraseña',
      CLOSE: 'Cerrar',
      EMAIL: 'Correo',
      SEND_REQUEST_PASSWORD: 'Enviar solicitud de Contraseña'
    }
  },
  MENU: {
    SELECT_LENGUAJE: 'Selecciona un Idioma',
    DARK_MODE: 'Modo Oscuro'
  }
};
