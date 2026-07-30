const parseRecipients = (raw) => {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.map((item) =>
      typeof item === "string" ? item : item.email
    );
  }

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);

      if (Array.isArray(parsed)) {
        return parsed.map((item) =>
          typeof item === "string" ? item : item.email
        );
      }
    } catch {
      return [raw];
    }
  }

  return [];
};

export default parseRecipients;