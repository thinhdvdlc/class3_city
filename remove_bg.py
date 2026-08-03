from PIL import Image

def remove_background(input_path, output_path, tolerance=30):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.load()
        width, height = img.size
        
        target_color = (255, 255, 255, 255)
        
        stack = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
        for i in range(width):
            stack.append((i, 0))
            stack.append((i, height-1))
        for j in range(height):
            stack.append((0, j))
            stack.append((width-1, j))
            
        visited = set(stack)
        
        def color_dist(c1, c2):
            return sum(abs(a - b) for a, b in zip(c1[:3], c2[:3]))
            
        while stack:
            x, y = stack.pop()
            
            if color_dist(data[x, y], target_color) <= tolerance:
                data[x, y] = (255, 255, 255, 0)
                
                for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < width and 0 <= ny < height:
                        if (nx, ny) not in visited:
                            visited.add((nx, ny))
                            stack.append((nx, ny))
                            
        # Xóa các viền trắng còn sót lại (Anti-aliasing fringe)
        for y in range(height):
            for x in range(width):
                r, g, b, a = data[x, y]
                if a != 0:
                    if r > 240 and g > 240 and b > 240:
                         data[x, y] = (255, 255, 255, 0)
                         
        img.save(output_path, "PNG")
        print(f"Processed {input_path}")
    except Exception as e:
        print(f"Error on {input_path}: {e}")

remove_background("public/bank.png", "public/bank.png")
remove_background("public/library.png", "public/library.png")
remove_background("public/airport.png", "public/airport.png")
print("Done")
