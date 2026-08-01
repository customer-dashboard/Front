import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../proxy";
import InstallTemplateButton from "./InstallTemplate";

const DEFAULT_TEMPLATE = {
    subject: "Welcome to Custlo 🎉",
    body: `<p>Hi there,</p>
         <p>Thank you for installing the Custlo app.</p>
         <p>We're excited to have you on board!</p>`,
};

export default function InstallTemplatePage() {
    const [template, setTemplate] = useState(DEFAULT_TEMPLATE);

    useEffect(() => {
        fetchTemplate();
    }, []);

    const fetchTemplate = async () => {
        try {
            const { data } = await axios.get(
                `${API_URL}/api/install-template`
            );

            setTemplate({
                subject: data.subject?.trim() || DEFAULT_TEMPLATE.subject,
                body: data.body?.trim() || DEFAULT_TEMPLATE.body,
            });
        } catch (err) {
            console.error(err);
            setTemplate(DEFAULT_TEMPLATE);
        }
    };

    return (
        <div className="max-w-6xl mx-auto mb-8" >
            <InstallTemplateButton
                subject={template.subject}
                body={template.body}
            />
        </div>
    );
}