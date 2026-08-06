INSERT INTO engineers (id, name, role, location, photo_url, rating) VALUES
    (1, 'Aarav Patel', 'Electrical Engineer', 'London', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', 4.9),
    (2, 'Maya Singh', 'Senior Power Systems Engineer', 'Manchester', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', 4.8),
    (3, 'Rohan Mehta', 'Field Service Engineer', 'Birmingham', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', 4.2),
    (4, 'Emily Clark', 'Control Systems Engineer', 'Leeds', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80', 4.6),
    (5, 'Noah Williams', 'Renewable Energy Engineer', 'Bristol', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', 4.7),
    (6, 'Priya Nair', 'High Voltage Engineer', 'Glasgow', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', 4.9)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    role = VALUES(role),
    location = VALUES(location),
    photo_url = VALUES(photo_url),
    rating = VALUES(rating);

DELETE FROM engineers WHERE id > 6;

INSERT INTO products (product_id, name, category, description, image_url, price, stock_quantity, created_by) VALUES
    (1, 'Smart Distribution Panel', 'Distribution', 'A compact smart panel for monitoring branch circuits, load balancing, and electrical safety in commercial buildings.', 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=600&q=80', 1299.00, 12, 'system'),
    (2, 'Industrial Surge Protector', 'Protection', 'Panel-mounted surge protection designed for industrial sites that need reliable protection from transient voltage spikes.', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80', 249.99, 40, 'system'),
    (3, 'Energy Monitoring Meter', 'Monitoring', 'A network-ready meter that helps facilities track energy consumption, identify peak loads, and plan efficiency improvements.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80', 349.50, 25, 'system'),
    (4, 'Field Service Tool Kit', 'Maintenance', 'A practical electrical maintenance kit with insulated hand tools, testers, and quick-access field accessories.', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80', 179.00, 18, 'system'),
    (5, 'EV Charger Load Controller', 'EV Infrastructure', 'A controller for managing EV charger demand, preventing overloads, and prioritising available site capacity.', 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80', 599.00, 9, 'system'),
    (6, 'Portable Power Quality Analyzer', 'Testing', 'A portable analyser for diagnosing harmonics, voltage dips, power factor issues, and site reliability problems.', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80', 899.00, 7, 'system'),
    (7, 'Compact Circuit Breaker Set', 'Protection', 'A set of compact breakers for small commercial distribution boards and fast maintenance replacements.', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80', 89.99, 34, 'system'),
    (8, 'Insulated Cable Reel', 'Installation', 'Heavy-duty insulated cable reel for temporary site power, workshops, and field installation teams.', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=600&q=80', 139.00, 16, 'system'),
    (9, 'Thermal Inspection Camera', 'Testing', 'Portable thermal camera for spotting overloaded circuits, hot joints, and early electrical faults.', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80', 459.00, 11, 'system'),
    (10, 'Commercial LED Driver Pack', 'Lighting', 'High-efficiency LED driver pack for commercial lighting upgrades and maintenance spares.', 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80', 74.50, 50, 'system'),
    (11, 'Battery Backup Controller', 'Backup Power', 'Controller for backup power switching, battery monitoring, and resilience planning in critical spaces.', 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=600&q=80', 699.00, 8, 'system')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    category = VALUES(category),
    description = VALUES(description),
    image_url = VALUES(image_url),
    price = VALUES(price),
    stock_quantity = VALUES(stock_quantity);

INSERT INTO users (user_id, name, email, mobile_number, password, enabled, created_by) VALUES
    (1, 'VoltPro Admin', 'admin@voltpro.com', '9999999999', '$2a$12$UsG/1VJxi.1wc843mG19AO5ST7vAf0G1W3RC7/i700B4DMhc7hoOu', TRUE, 'system'),
    (2, 'VoltPro User', 'user@voltpro.com', '8888888888', '$2a$12$UsG/1VJxi.1wc843mG19AO5ST7vAf0G1W3RC7/i700B4DMhc7hoOu', TRUE, 'system')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    mobile_number = VALUES(mobile_number),
    enabled = VALUES(enabled);

INSERT IGNORE INTO user_roles (user_id, role) VALUES
    (1, 'USER'),
    (1, 'ADMIN'),
    (2, 'USER');
