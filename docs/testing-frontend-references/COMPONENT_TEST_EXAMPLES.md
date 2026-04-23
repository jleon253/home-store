# 🧪 Ejemplos de Tests por Componente

## 📋 Tabla de Contenidos

- [ATOMS](#atoms)
- [MOLECULES](#molecules)
- [ORGANISMS](#organisms)
- [SHARED](#shared)

---

## ATOMS

### Logo.tsx

```typescript
// src/presentation/atoms/Logo/Logo.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('should render logo with HomeStore text', () => {
    render(<Logo />);
    const homeStoreText = screen.getByText('HomeStore');
    expect(homeStoreText).toBeInTheDocument();
  });

  it('should render as a link to home page', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('should render logo icon with correct dimensions', () => {
    render(<Logo />);
    const box = screen.getByText('H');
    expect(box).toHaveClass('MuiBox-root');
  });

  it('should have correct styling on hover (cursor pointer)', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    const stack = link.querySelector('[direction="row"]');
    expect(stack).toHaveStyle('cursor: pointer');
  });
});
```

### SearchInput.tsx

```typescript
// src/presentation/atoms/SearchInput/SearchInput.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('should render input field with placeholder', () => {
    const mockOnSearch = vi.fn();
    render(
      <SearchInput 
        onSearch={mockOnSearch} 
        placeholder="Buscar productos..." 
      />
    );
    const input = screen.getByPlaceholderText('Buscar productos...');
    expect(input).toBeInTheDocument();
  });

  it('should update input value on change', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchInput onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.type(input, 'laptop');
    
    expect(input.value).toBe('laptop');
  });

  it('should call onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchInput onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test');
    await user.keyboard('{Enter}');
    
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('should call onSearch when search button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchInput onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'drill');
    
    const searchButton = screen.getByLabelText('buscar');
    await user.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('drill');
  });

  it('should trim whitespace before calling onSearch', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchInput onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, '  laptop  ');
    await user.keyboard('{Enter}');
    
    expect(mockOnSearch).toHaveBeenCalledWith('laptop');
  });

  it('should not call onSearch if input is empty', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchInput onSearch={mockOnSearch} />);
    
    const searchButton = screen.getByLabelText('buscar');
    await user.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
```

### ThemeToggleButton.tsx

```typescript
// src/presentation/atoms/ThemeToggleButton/ThemeToggleButton.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeToggleButton } from './ThemeToggleButton';

describe('ThemeToggleButton', () => {
  it('should render button with correct aria-label', () => {
    render(<ThemeToggleButton />);
    const button = screen.getByLabelText('cambiar modo oscuro');
    expect(button).toBeInTheDocument();
  });

  it('should render DarkModeIcon', () => {
    render(<ThemeToggleButton />);
    const button = screen.getByLabelText('cambiar modo oscuro');
    const icon = button.querySelector('[data-testid="Brightness3Icon"]');
    expect(icon).toBeInTheDocument();
  });

  it('should render as IconButton component', () => {
    render(<ThemeToggleButton />);
    const button = screen.getByLabelText('cambiar modo oscuro');
    expect(button).toHaveClass('MuiIconButton-root');
  });
});
```

---

## MOLECULES

### BodyCarousel.tsx

```typescript
// src/presentation/molecules/BodyCarousel/BodyCarousel.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BodyCarousel } from './BodyCarousel';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => 
    <img src={src} alt={alt} {...props} />
}));

describe('BodyCarousel', () => {
  const mockImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ];

  it('should render main image', () => {
    render(<BodyCarousel images={mockImages} />);
    const mainImage = screen.getAllByRole('img')[0];
    expect(mainImage).toHaveAttribute('src', mockImages[0]);
  });

  it('should render thumbnail images', () => {
    render(<BodyCarousel images={mockImages} />);
    const images = screen.getAllByRole('img');
    // 1 main + 3 thumbnails
    expect(images).toHaveLength(4);
  });

  it('should display next image when next button is clicked', async () => {
    const user = userEvent.setup();
    render(<BodyCarousel images={mockImages} />);
    
    const mainImage = screen.getAllByRole('img')[0] as HTMLImageElement;
    expect(mainImage.src).toContain(mockImages[0]);
    
    const nextButton = screen.getByLabelText((_, element) => 
      element?.getAttribute('aria-label') === undefined
    ).closest('button:nth-of-type(2)') || 
    document.querySelectorAll('button')[1];
    
    await user.click(nextButton);
    
    expect(mainImage.src).toContain(mockImages[1]);
  });

  it('should display previous image when prev button is clicked', async () => {
    const user = userEvent.setup();
    render(<BodyCarousel images={mockImages} />);
    
    const mainImage = screen.getAllByRole('img')[0] as HTMLImageElement;
    expect(mainImage.src).toContain(mockImages[0]);
    
    const prevButton = document.querySelectorAll('button')[0];
    
    // Click next twice
    await user.click(document.querySelectorAll('button')[1]);
    await user.click(document.querySelectorAll('button')[1]);
    
    expect(mainImage.src).toContain(mockImages[2]);
    
    // Click prev
    await user.click(prevButton);
    
    expect(mainImage.src).toContain(mockImages[1]);
  });

  it('should wrap around from last to first image', async () => {
    const user = userEvent.setup();
    render(<BodyCarousel images={mockImages} />);
    
    const mainImage = screen.getAllByRole('img')[0] as HTMLImageElement;
    const nextButton = document.querySelectorAll('button')[1];
    
    // Click next 3 times to reach the end
    await user.click(nextButton);
    await user.click(nextButton);
    await user.click(nextButton);
    
    expect(mainImage.src).toContain(mockImages[0]); // Wraps around
  });

  it('should change image when thumbnail is clicked', async () => {
    const user = userEvent.setup();
    render(<BodyCarousel images={mockImages} />);
    
    const mainImage = screen.getAllByRole('img')[0] as HTMLImageElement;
    const thumbnail = screen.getAllByRole('img')[2]; // Second thumbnail
    
    await user.click(thumbnail);
    
    expect(mainImage.src).toContain(mockImages[1]);
  });

  it('should highlight active thumbnail', () => {
    render(<BodyCarousel images={mockImages} />);
    // First thumbnail should have different border
    const thumbnails = document.querySelectorAll('[style*="border"]');
    expect(thumbnails[0]).toHaveStyle('border: 2px solid #EC6608');
  });
});
```

### Breadcrumb.tsx

```typescript
// src/presentation/molecules/Breadcrumb/Breadcrumb.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Breadcrumb } from './Breadcrumb';
import { useProductStore } from '@/presentation/store/useProductStore';

// Mock the store
vi.mock('@/presentation/store/useProductStore');

describe('Breadcrumb', () => {
  const mockBreadcrumbs = [
    { id: '1', label: 'Herramientas' },
    { id: '2', label: 'Taladros' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render if category is not in store', () => {
    vi.mocked(useProductStore).mockImplementation(() => ({
      category: null,
    } as any));

    const { container } = render(<Breadcrumb />);
    expect(container.firstChild).toBeNull();
  });

  it('should render breadcrumbs from store', () => {
    vi.mocked(useProductStore).mockImplementation(() => ({
      category: { breadcrumbs: mockBreadcrumbs },
    } as any));

    render(<Breadcrumb />);
    
    expect(screen.getByText('Herramientas')).toBeInTheDocument();
    expect(screen.getByText('Taladros')).toBeInTheDocument();
  });

  it('should not render last breadcrumb as link', () => {
    vi.mocked(useProductStore).mockImplementation(() => ({
      category: { breadcrumbs: mockBreadcrumbs },
    } as any));

    render(<Breadcrumb />);
    
    const links = screen.getAllByRole('link');
    // Only first breadcrumb should be a link
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('Herramientas');
  });

  it('should link to correct category page', () => {
    vi.mocked(useProductStore).mockImplementation(() => ({
      category: { breadcrumbs: mockBreadcrumbs },
    } as any));

    render(<Breadcrumb />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/categoria/1');
  });

  it('should render with breadcrumb nav element', () => {
    vi.mocked(useProductStore).mockImplementation(() => ({
      category: { breadcrumbs: mockBreadcrumbs },
    } as any));

    render(<Breadcrumb />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});
```

### CartIconBadge.tsx

```typescript
// src/presentation/molecules/CartIconBadge/CartIconBadge.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartIconBadge } from './CartIconBadge';
import { useCartStore } from '@/presentation/store/useCartStore';

vi.mock('@/presentation/store/useCartStore');
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => 
    <a href={href}>{children}</a>
}));

describe('CartIconBadge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render disabled cart icon before mount', () => {
    vi.mocked(useCartStore).mockImplementation(() => ({
      items: [],
    } as any);

    render(<CartIconBadge />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should display item count in badge', async () => {
    vi.mocked(useCartStore).mockImplementation(() => ({
      items: [
        { id: '1', quantity: 2 },
        { id: '2', quantity: 3 },
      ],
    } as any);

    render(<CartIconBadge />);
    
    // Simulate mounting
    vi.runAllTimers();
    
    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  it('should show empty cart message when no items', async () => {
    vi.mocked(useCartStore).mockImplementation(() => ({
      items: [],
    } as any);

    render(<CartIconBadge />);
    
    vi.runAllTimers();
    
    await waitFor(() => {
      expect(screen.getByTitle('Carrito vacío')).toBeInTheDocument();
    });
  });

  it('should link to cart page', async () => {
    vi.mocked(useCartStore).mockImplementation(() => ({
      items: [{ id: '1', quantity: 1 }],
    } as any);

    render(<CartIconBadge />);
    
    vi.runAllTimers();
    
    await waitFor(() => {
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/cart');
    });
  });

  it('should not show badge when items = 0', () => {
    vi.mocked(useCartStore).mockImplementation(() => ({
      items: [],
    } as any);

    render(<CartIconBadge />);
    
    const badge = document.querySelector('.MuiBadge-badge');
    expect(badge?.textContent).not.toBe('0');
  });
});
```

### CartItemRow.tsx

```typescript
// src/presentation/molecules/CartItemRow/CartItemRow.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CartItemRow } from './CartItemRow';
import { Product } from '@/core/entities';

vi.mock('next/image', () => ({
  default: ({ src, alt }: any) => <img src={src} alt={alt} />
}));

describe('CartItemRow', () => {
  const mockProduct: Product & { quantity: number } = {
    id: '1',
    title: 'Taladro Eléctrico',
    brand: 'Bosch',
    images: ['https://example.com/image.jpg'],
    mainPrice: { amount: 15000, currency: 'CLP' },
    originalPrice: { amount: 20000, currency: 'CLP' },
    quantity: 2,
    rating: 4.5,
    reviewsCount: 10,
    model: 'GSB 500',
    highlights: [],
    hasDiscount: true,
  } as any;

  it('should render product image', () => {
    const mockOnIncrease = vi.fn();
    const mockOnDecrease = vi.fn();
    const mockOnRemove = vi.fn();

    render(
      <CartItemRow
        item={mockProduct}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
        onRemove={mockOnRemove}
      />
    );

    const image = screen.getByAltText('Taladro Eléctrico');
    expect(image).toBeInTheDocument();
  });

  it('should render product details', () => {
    const mockOnIncrease = vi.fn();
    const mockOnDecrease = vi.fn();
    const mockOnRemove = vi.fn();

    render(
      <CartItemRow
        item={mockProduct}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText('Taladro Eléctrico')).toBeInTheDocument();
    expect(screen.getByText('Marca: Bosch')).toBeInTheDocument();
  });

  it('should render price with correct format', () => {
    const mockOnIncrease = vi.fn();
    const mockOnDecrease = vi.fn();
    const mockOnRemove = vi.fn();

    render(
      <CartItemRow
        item={mockProduct}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText('$15,000')).toBeInTheDocument();
  });

  it('should call onIncrease when increase button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnIncrease = vi.fn();
    const mockOnDecrease = vi.fn();
    const mockOnRemove = vi.fn();

    render(
      <CartItemRow
        item={mockProduct}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
        onRemove={mockOnRemove}
      />
    );

    const buttons = screen.getAllByRole('button');
    const increaseButton = buttons.find(b => 
      b.querySelector('[data-testid="AddIcon"]')
    );

    await user.click(increaseButton!);
    expect(mockOnIncrease).toHaveBeenCalledWith('1');
  });

  it('should call onDecrease when decrease button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnIncrease = vi.fn();
    const mockOnDecrease = vi.fn();
    const mockOnRemove = vi.fn();

    render(
      <CartItemRow
        item={mockProduct}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
        onRemove={mockOnRemove}
      />
    );

    const buttons = screen.getAllByRole('button');
    const decreaseButton = buttons.find(b => 
      b.querySelector('[data-testid="RemoveIcon"]')
    );

    await user.click(decreaseButton!);
    expect(mockOnDecrease).toHaveBeenCalledWith('1');
  });

  it('should disable decrease button when quantity is 1', () => {
    const product: Product & { quantity: number } = {
      ...mockProduct,
      quantity: 1,
    };

    const mockOnIncrease = vi.fn();
    const mockOnDecrease = vi.fn();
    const mockOnRemove = vi.fn();

    render(
      <CartItemRow
        item={product}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
        onRemove={mockOnRemove}
      />
    );

    const buttons = screen.getAllByRole('button');
    const decreaseButton = buttons[0]; // Usually first control button
    
    expect(decreaseButton).toBeDisabled();
  });

  it('should display correct quantity', () => {
    const mockOnIncrease = vi.fn();
    const mockOnDecrease = vi.fn();
    const mockOnRemove = vi.fn();

    render(
      <CartItemRow
        item={mockProduct}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should call onRemove when delete button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnIncrease = vi.fn();
    const mockOnDecrease = vi.fn();
    const mockOnRemove = vi.fn();

    render(
      <CartItemRow
        item={mockProduct}
        onIncrease={mockOnIncrease}
        onDecrease={mockOnDecrease}
        onRemove={mockOnRemove}
      />
    );

    const buttons = screen.getAllByRole('button');
    const deleteButton = buttons.find(b => 
      b.querySelector('[data-testid="DeleteOutlineIcon"]')
    );

    await user.click(deleteButton!);
    expect(mockOnRemove).toHaveBeenCalledWith('1');
  });
});
```

---

## ORGANISMS

### CartView.tsx

```typescript
// src/presentation/organisms/CartView/CartView.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartView } from './CartView';
import { useCartStore } from '@/presentation/store/useCartStore';
import * as nextLink from 'next/link';

vi.mock('@/presentation/store/useCartStore');
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => 
    <a href={href}>{children}</a>
}));

describe('CartView', () => {
  const mockProduct = {
    id: '1',
    title: 'Taladro',
    brand: 'Bosch',
    mainPrice: { amount: 15000, currency: 'CLP' },
    originalPrice: { amount: 20000, currency: 'CLP' },
    images: ['image.jpg'],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not render until mounted', () => {
    vi.mocked(useCartStore).mockImplementation(() => ({
      items: [],
    } as any);

    const { container } = render(<CartView />);
    expect(container.firstChild).toBeNull();
  });

  it('should show empty cart message when no items', async () => {
    vi.mocked(useCartStore).mockImplementation(() => ({
      items: [],
    } as any);

    render(<CartView />);
    
    vi.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
    });
  });

  it('should render cart items', async () => {
    vi.mocked(useCartStore).mockImplementation(() => ({
      items: [{ ...mockProduct, quantity: 2 }],
      getSubtotal: () => 40000,
      getTotal: () => 30000,
      getSavings: () => 10000,
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
    } as any);

    render(<CartView />);
    
    vi.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText('Taladro')).toBeInTheDocument();
    });
  });

  it('should display order summary with correct calculations', async () => {
    vi.mocked(useCartStore).mockImplementation(() => ({
      items: [{ ...mockProduct, quantity: 2 }],
      getSubtotal: () => 40000,
      getTotal: () => 30000,
      getSavings: () => 10000,
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
    } as any);

    render(<CartView />);
    
    vi.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText('Subtotal')).toBeInTheDocument();
      expect(screen.getByText('$40,000')).toBeInTheDocument();
      expect(screen.getByText('-$10,000')).toBeInTheDocument();
      expect(screen.getByText('$30,000')).toBeInTheDocument();
    });
  });

  it('should have button to continue shopping', async () => {
    vi.mocked(useCartStore).mockImplementation(() => ({
      items: [{ ...mockProduct, quantity: 1 }],
      getSubtotal: () => 20000,
      getTotal: () => 15000,
      getSavings: () => 5000,
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
    } as any);

    render(<CartView />);
    
    vi.runAllTimers();

    await waitFor(() => {
      const links = screen.getAllByRole('link');
      expect(links.some(l => l.textContent?.includes('Seguir comprando')))
        .toBeTruthy();
    });
  });
});
```

### ProductGrid.tsx

```typescript
// src/presentation/organisms/ProductGrid/ProductGrid.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductGrid } from './ProductGrid';
import { useProductStore } from '@/presentation/store/useProductStore';
import { useCartStore } from '@/presentation/store/useCartStore';
import { ProductSortService } from '@/core/services/product-sort.service';

vi.mock('@/presentation/store/useProductStore');
vi.mock('@/presentation/store/useCartStore');
vi.mock('@/core/services/product-sort.service');

describe('ProductGrid', () => {
  const mockProducts = [
    {
      id: '1',
      title: 'Taladro 1',
      brand: 'Bosch',
      mainPrice: { amount: 15000 },
      images: ['image.jpg'],
    },
    {
      id: '2',
      title: 'Taladro 2',
      brand: 'Makita',
      mainPrice: { amount: 20000 },
      images: ['image.jpg'],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not render until hydrated', () => {
    vi.mocked(useProductStore).mockImplementation(() => ({
      products: mockProducts,
      viewMode: 'GRID',
      setViewMode: vi.fn(),
    } as any);

    vi.mocked(useCartStore).mockImplementation(() => ({
      addItem: vi.fn(),
    } as any);

    vi.mocked(ProductSortService.sort).mockReturnValue(mockProducts);

    const { container } = render(<ProductGrid />);
    
    // Before hydration
    expect(container.querySelector('section')).toBeNull();
  });

  it('should display error modal when products fail to load', async () => {
    vi.mocked(useProductStore).mockImplementation(() => ({
      products: [],
      viewMode: 'GRID',
      setViewMode: vi.fn(),
    } as any);

    vi.mocked(useCartStore).mockImplementation(() => ({
      addItem: vi.fn(),
    } as any);

    render(<ProductGrid />);
    
    vi.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText(/Error de Carga/i)).toBeInTheDocument();
    });
  });

  it('should render products after hydration', async () => {
    vi.mocked(useProductStore).mockImplementation(() => ({
      products: mockProducts,
      viewMode: 'GRID',
      setViewMode: vi.fn(),
    } as any);

    vi.mocked(useCartStore).mockImplementation(() => ({
      addItem: vi.fn(),
    } as any);

    vi.mocked(ProductSortService.sort).mockReturnValue(mockProducts);

    render(<ProductGrid />);
    
    vi.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText('Taladro 1')).toBeInTheDocument();
      expect(screen.getByText('Taladro 2')).toBeInTheDocument();
    });
  });

  it('should sort products when sort order changes', async () => {
    const mockSortedProducts = [...mockProducts].reverse();
    
    const { rerender } = vi.mocked(useProductStore).mockImplementation(() => ({
      products: mockProducts,
      viewMode: 'GRID',
      setViewMode: vi.fn(),
    } as any);

    vi.mocked(useCartStore).mockImplementation(() => ({
      addItem: vi.fn(),
    } as any);

    vi.mocked(ProductSortService.sort)
      .mockReturnValueOnce(mockProducts)
      .mockReturnValueOnce(mockSortedProducts);

    render(<ProductGrid />);
    
    vi.runAllTimers();

    // Check that sorted products display
    expect(ProductSortService.sort).toHaveBeenCalled();
  });

  it('should show success modal when product is added to cart', async () => {
    vi.mocked(useProductStore).mockImplementation(() => ({
      products: mockProducts,
      viewMode: 'GRID',
      setViewMode: vi.fn(),
    } as any);

    const mockAddItem = vi.fn();
    vi.mocked(useCartStore).mockImplementation(() => ({
      addItem: mockAddItem,
    } as any);

    vi.mocked(ProductSortService.sort).mockReturnValue(mockProducts);

    render(<ProductGrid />);
    
    vi.runAllTimers();

    // Verify structure renders
    expect(screen.getByText('Taladro 1')).toBeInTheDocument();
  });

  it('should render empty state when no products after sorting', async () => {
    vi.mocked(useProductStore).mockImplementation(() => ({
      products: mockProducts,
      viewMode: 'GRID',
      setViewMode: vi.fn(),
    } as any);

    vi.mocked(useCartStore).mockImplementation(() => ({
      addItem: vi.fn(),
    } as any);

    vi.mocked(ProductSortService.sort).mockReturnValue([]);

    render(<ProductGrid />);
    
    vi.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText('No se encontraron productos.')).toBeInTheDocument();
    });
  });
});
```

---

## SHARED

### HydrateStore.tsx

```typescript
// src/presentation/shared/HydrateStore.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HydrateStore } from './HydrateStore';
import { useProductStore } from '@/presentation/store/useProductStore';

vi.mock('@/presentation/store/useProductStore');

describe('HydrateStore', () => {
  const mockCategory = {
    id: '1',
    name: 'Herramientas',
    breadcrumbs: [],
  };

  const mockProducts = [
    {
      id: '1',
      title: 'Taladro',
      brand: 'Bosch',
      mainPrice: { amount: 15000, currency: 'CLP' },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render null (no UI)', () => {
    const mockSetCatalog = vi.fn();
    vi.mocked(useProductStore).mockImplementation(() => ({
      setCatalog: mockSetCatalog,
    } as any);

    const { container } = render(
      <HydrateStore category={mockCategory} products={mockProducts} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should call setCatalog once with category and products', () => {
    const mockSetCatalog = vi.fn();
    vi.mocked(useProductStore).mockImplementation(() => ({
      setCatalog: mockSetCatalog,
    } as any);

    render(
      <HydrateStore category={mockCategory} products={mockProducts} />
    );

    expect(mockSetCatalog).toHaveBeenCalledWith(mockCategory, mockProducts);
  });

  it('should not call setCatalog on re-render', () => {
    const mockSetCatalog = vi.fn();
    vi.mocked(useProductStore).mockImplementation(() => ({
      setCatalog: mockSetCatalog,
    } as any);

    const { rerender } = render(
      <HydrateStore category={mockCategory} products={mockProducts} />
    );

    expect(mockSetCatalog).toHaveBeenCalledTimes(1);

    rerender(
      <HydrateStore category={mockCategory} products={mockProducts} />
    );

    expect(mockSetCatalog).toHaveBeenCalledTimes(1);
  });

  it('should initialize only once even with prop changes', () => {
    const mockSetCatalog = vi.fn();
    vi.mocked(useProductStore).mockImplementation(() => ({
      setCatalog: mockSetCatalog,
    } as any);

    const newProducts = [...mockProducts, { id: '2', title: 'Martillo' }];

    const { rerender } = render(
      <HydrateStore category={mockCategory} products={mockProducts} />
    );

    rerender(
      <HydrateStore category={mockCategory} products={newProducts} />
    );

    expect(mockSetCatalog).toHaveBeenCalledTimes(1);
    expect(mockSetCatalog).toHaveBeenCalledWith(mockCategory, mockProducts);
  });
});
```

---

## 📌 Notas sobre Testing

### **Setup Requerido (vitest.config.ts)**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/infrastructure/api/mocks/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### **Imports Comunes en Tests**
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
```

### **Mocks Comunes**
```typescript
// Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => 
    <a href={href}>{children}</a>
}));

// Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => 
    <img src={src} alt={alt} {...props} />
}));

// Next.js Router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));

// Zustand Stores
vi.mock('@/presentation/store/useCartStore');
vi.mock('@/presentation/store/useProductStore');
```

---

**Próximo paso**: Implementar tests incrementalmente siguiendo el orden recomendado en COMPONENT_ANALYSIS.md

