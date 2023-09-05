const noteTemplate = document.createElement('template');

noteTemplate.innerHTML = `
<style>
	.note {
		padding:8px;
		background-color: #f5e76e;
		border-radius: 4px;
	}
	
	.note-header {
		padding: 4px 4px;
	}
	
	.note-content {
		min-height: 125px;
		padding: 8px 4px;
	}
	
	.note-footer {
		padding: 8px 4px;
		text-align: end;
	}
</style>
<div class="note">
	<header class="note-header">
		<h3>title</h3>
	</header>
	<section class="note-content">
		content of note 1
	</section>
	<footer class="note-footer">
		metadata (created at, edited at)
	</footer>
</div>
`

class Note extends HTMLElement {
	constructor() {
		// making sure we call the HTMLElement constructor
		super();
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.appendChild(noteTemplate.content.cloneNode(true));
	}

	// -- CAN WE USE THIS IN THE CONSTRUCTOR?
	// -- I'M PRETTY SURE I READ SOMEWHERE NOT TO
	// -- USE IT IN THE CONSTRUCTOR, BUT CANT FIND IT
	/*connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.appendChild(noteTemplate.content.cloneNode(true));
	}*/

	set title(value){
		this.setAttribute('title', value)
	}
	  
	get title(){
		this.getAttribute('title')
	}

	set content(value) {
		this.setAttribute('content', value);
	}

	get content(){
		this.getAttribute('content')
	}


	// the attributes you want to observe
	// (you can insert whatever you want in here)
	static get observedAttributes() {
		return ["title", "content", "metadata"];
	}

	// the callback that is called when any of
	// the observed attributes are changed
	attributeChangedCallback(name, oldValue, newValue) {
		console.log(name, oldValue, newValue);

		if (name === 'title') this.updateTitle(newValue);
		else if (name === 'content') this.updateContent(newValue);
	}

	updateTitle(newTitle) {
		this.shadowRoot.querySelector('h3').innerText = newTitle;
	}

	updateContent(newContent) {
		this.shadowRoot.querySelector('section').innerText = newContent
	}
	
}

customElements.define("note-item", Note);