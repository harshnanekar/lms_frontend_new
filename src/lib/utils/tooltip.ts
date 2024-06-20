// tooltip.ts

interface TooltipParams {
	content: string;
	position?: 'top' | 'bottom' | 'left' | 'right';
}

export function tooltip(node: HTMLElement, params: TooltipParams) {
	if (!params.content) {
		return;
	}
	let tooltipElement: HTMLSpanElement | null = null;

	function createTooltip() {
		tooltipElement = document.createElement('span');
		tooltipElement.innerHTML = params.content;
		tooltipElement.classList.add('tooltip', `tooltip-${params.position || 'top'}`);
		document.body.appendChild(tooltipElement);
	}

	function updateTooltipPosition() {
		if (!tooltipElement) return;

		const rect = node.getBoundingClientRect();
		const tooltipRect = tooltipElement.getBoundingClientRect();

		let top, left;

		switch (params.position) {
			case 'top':
				top = rect.top + window.scrollY - tooltipRect.height - 15;
				left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;
				break;
			case 'bottom':
				top = rect.bottom + window.scrollY + 15;
				left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;
				break;
			case 'left':
				top = rect.top + window.scrollY + rect.height / 2 - tooltipRect.height / 2;
				left = rect.left + window.scrollX - tooltipRect.width - 15;
				break;
			case 'right':
				top = rect.top + window.scrollY + rect.height / 2 - tooltipRect.height / 2;
				left = rect.right + window.scrollX + 15;
				break;
			default:
				top = rect.top + window.scrollY - tooltipRect.height - 15;
				left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;
				break;
		}

		// Adjust position if tooltip overflows the viewport
		if (top < window.scrollY) {
			top = rect.bottom + window.scrollY + 15;
			tooltipElement.classList.add('tooltip-arrow-bottom');
		} else {
			tooltipElement.classList.remove('tooltip-arrow-bottom');
		}

		if (left + tooltipRect.width > window.innerWidth) {
			left = window.innerWidth - tooltipRect.width - 15;
		}
		if (left < 0) {
			left = 15;
		}

		tooltipElement.style.top = `${top}px`;
		tooltipElement.style.left = `${left}px`;
	}

	function handleMouseEnter() {
		createTooltip();
		window.addEventListener('scroll', updateTooltipPosition);
		updateTooltipPosition();
	}

	function handleMouseLeave() {
		if (tooltipElement) {
			document.body.removeChild(tooltipElement);
			tooltipElement = null;
		}
		window.removeEventListener('scroll', updateTooltipPosition);
	}

	function handleDblClick() {
		// copy this text to clipboard for both mac and windows
		// navigator.clipboard.writeText(params.content)
	}

	node.addEventListener('mouseenter', handleMouseEnter);
	node.addEventListener('mouseleave', handleMouseLeave);
	node.addEventListener('dblclick', handleDblClick);

	return {
		destroy() {
			handleMouseLeave();
			node.removeEventListener('mouseenter', handleMouseEnter);
			node.removeEventListener('mouseleave', handleMouseLeave);
			node.removeEventListener('dblclick', handleDblClick);
		}
	};
}
