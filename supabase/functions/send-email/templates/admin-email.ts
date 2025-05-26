
export const generateAdminEmailHTML = (formData: any): string => {
  const isCallbackRequest = formData.name.includes("Žádost o zpětné volání");

  if (isCallbackRequest) {
    // Simplified content for callback requests
    return `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0F4C81; border-bottom: 1px solid #eee; padding-bottom: 10px;">📞 Žádost o zpětné volání</h2>
        <div style="margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
          <p style="margin: 10px 0; font-size: 18px;"><strong>Telefonní číslo:</strong> ${formData.phone}</p>
          <p style="margin: 10px 0;"><strong>Čas žádosti:</strong> ${new Date().toLocaleString('cs-CZ')}</p>
        </div>
        <p style="color: #666; font-style: italic;">Tato žádost byla automaticky vygenerována z formuláře na webu popri.cz</p>
      </div>
    `;
  } else {
    // Standard contact form content
    return `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0F4C81; border-bottom: 1px solid #eee; padding-bottom: 10px;">Nový kontakt z pripojeni-poda.cz</h2>
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Jméno:</strong> ${formData.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${formData.email}</p>
          <p style="margin: 10px 0;"><strong>Telefon:</strong> ${formData.phone}</p>
          ${formData.propertyType ? `<p style="margin: 10px 0;"><strong>Typ nehnuteľnosti:</strong> ${formData.propertyType === 'byty' ? 'Byt/bytovka' : 'Rodinný dom'}</p>` : ''}
          ${formData.address ? `<p style="margin: 10px 0;"><strong>Adresa:</strong> ${formData.address}</p>` : ''}
          ${formData.city ? `<p style="margin: 10px 0;"><strong>Město:</strong> ${formData.city}</p>` : ''}
          ${formData.zip ? `<p style="margin: 10px 0;"><strong>PSČ:</strong> ${formData.zip}</p>` : ''}
          ${formData.currentProvider ? `<p style="margin: 10px 0;"><strong>Současný poskytovatel:</strong> ${formData.currentProvider}</p>` : ''}
          ${formData.currentPrice ? `<p style="margin: 10px 0;"><strong>Aktuální cena:</strong> ${formData.currentPrice}</p>` : ''}
        </div>
        ${formData.message ? `
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3 style="margin-top: 0; color: #333;">Zpráva od zákazníka:</h3>
            <p style="white-space: pre-line;">${formData.message}</p>
          </div>
        ` : ''}
      </div>
    `;
  }
};
