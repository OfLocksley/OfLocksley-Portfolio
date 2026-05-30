async function fetchMarkdown(folderLocationAndName) {
  try {
    const response = await fetch(folderLocationAndName);
    if (!response.ok) throw new Error('Network error');

    const text = await response.text();
    
    return marked.parse(text);
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}