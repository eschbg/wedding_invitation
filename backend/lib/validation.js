export function validateWish(name, content) {
    if (!name || name.trim().length < 2) {
      return { valid: false, error: 'Tên phải có ít nhất 2 ký tự' };
    }
    
    if (name.length > 50) {
      return { valid: false, error: 'Tên không được quá 50 ký tự' };
    }
  
    if (!content || content.trim().length < 10) {
      return { valid: false, error: 'Lời chúc phải có ít nhất 10 ký tự' };
    }
    
    if (content.length > 500) {
      return { valid: false, error: 'Lời chúc không được quá 500 ký tự' };
    }
  
    const badWords = ['spam', 'xxx', 'hack'];
    const text = `${name} ${content}`.toLowerCase();
    const hasBadWord = badWords.some(word => text.includes(word));
  
    if (hasBadWord) {
      return { valid: false, error: 'Nội dung không phù hợp' };
    }
  
    return { valid: true };
  }
  
  export function sanitizeInput(text) {
    return text
      .trim()
      .replace(/[<>]/g, '')
      .slice(0, 500);
  }