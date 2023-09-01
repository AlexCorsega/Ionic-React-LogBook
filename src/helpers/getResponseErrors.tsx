import React from "react";

function getResponseErrors(errorResponse: any): string {
  if (!errorResponse) return "";
  if (errorResponse.response.data.errors) {
    const keys = Object.keys(errorResponse.response.data.errors);
    let errors = "";
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      errors += errorResponse.response.data.errors[element][0] + "\n\n";
    }
    return errors;
  }
  return errorResponse.response.data.message;
}

export default getResponseErrors;
